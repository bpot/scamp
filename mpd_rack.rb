require 'rubygems'
require 'librmpd'
require 'rack'
require 'json'
require 'digest/sha2'
MPD_HOST='play.b-pot.org'
MPD_PORT=6600
# This is pretty ugly, but gets the job done for now....
class MPDRack
  def initialize
    connect
  end
  def call(env)
    connect
    body = handle_path(env)
    #disconnect
    return [200, {"Content-Type" => "application/json"}, [body]]
  end

  private
  def handle_path(env)
    case env["PATH_INFO"]
    when /\/sc\/playlist/
      playlist = @mpd.playlist
      return {:records => playlist.collect{|p| p.merge(:guid => (1+p["pos"].to_i).to_s, "pos" => (1+p["pos"].to_i).to_i)}.sort_by{|a| a["pos"]}, :ids => playlist.collect{|p| (1+p["pos"].to_i).to_s}}.to_json
    when /\/sc\/status/
      status = @mpd.status
      return {:records => [status.merge(:guid => "1", "songid" => status["songid"].to_s)], :ids => ["1"]}.to_json
    when /\/sc\/artists/
      artists = @mpd.artists.collect{|a| {:name => a, :guid => guid_from_string(a)}}
      r = {:records => artists, :ids => artists.collect{|p| p["guid"]}}.to_json
      return r
    when /\/sc\/albums/
      albums = get_albums
      r = {:records => albums, :ids => albums.collect{|p| p["guid"].to_s}}.to_json
      return r
    when /\/sc\/add_album\/(.*)/
      add_album($1)
    when /\/sc\/play\/(.*)/
      play($1)
    when /\/sc\/refresh/
      update_database
    else
      p "Fell thrhough"
      "ehhhh"
    end
  end
  def guid_from_string(s)
    Digest::SHA2.hexdigest(s)[0..6].to_i(16).to_s
  end
  def connect
    return if @mpd && @mpd.connected?
    p "Opening new connection to MPD"
    @mpd = MPD.new(MPD_HOST,MPD_PORT)
    @mpd.connect
  end
  def disconnect
    @mpd.disconnect
  end
  def update_database
    @mpd.update
    return ["done"].to_json
  end
  def add_album(data)
    artist, album = data.split(";")
    songs = @mpd.find("album", album)
    p "Songs: " + songs.inspect
    songs.each do |s|
      @mpd.add s.file
    end
    return ["done"].to_json
  end
  def play(data)
    res = @mpd.play(data)
    if !res
      @mpd.play(data)
    end
    return ["done"].to_json
  end
  def get_albums
    albums = []
    @mpd.artists.each do |a|
      as = @mpd.albums(a)
      as.each do |album|
        albums.push(
          { :artist => a, :title => album, :guid => guid_from_string(a+"SpecialSauce"+album) }
        )
      end
    end
    return albums
  end
end
