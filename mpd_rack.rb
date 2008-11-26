require 'rubygems'
require 'librmpd'
require 'rack'
require 'json'
MPD_HOST='localhost'
MPD_PORT=6600
# This is pretty ugly, but gets the job done for now....
class MPDRack
  def call(env)
    connect
    return [200, {"Content-Type" => "application/json"}, [handle_path(env)]]
  end

  private
  def handle_path(env)
    case env["PATH_INFO"]
    when /\/sc\/playlist/
      return {:records => @mpd.playlist.collect{|p| p.merge(:guid => p["id"], :pos => p["pos"].to_i)}, :ids => @mpd.playlist.collect{|p| p["id"]}}.to_json
    when /\/sc\/status/
      return {:records => [@mpd.status.merge(:guid => 1)], :ids => [1]}.to_json
    when /\/sc\/artists/
      artists = @mpd.artists.collect{|a| {:name => a}}
      artists.each_with_index do |a,idx|
        a["guid"] = idx.to_s
      end
      r = {:records => artists, :ids => artists.collect{|p| p["guid"].to_s}}.to_json
      return r
    when /\/sc\/albums/
      albums = get_albums
      r = {:records => albums, :ids => albums.collect{|p| p["guid"].to_s}}.to_json
      return r
    when /\/sc\/add_album\/(.*)/
      add_album($1)
    when /\/sc\/play\/(.*)/
      play($1)
    else
      "ehhhh"
    end
  end
  def connect
    @mpd = MPD.new('bpot.dyndns.org', 6600)
    @mpd.connect
  end
  def add_album(data)
    artist, album = data.split(";")
    songs = @mpd.find("album", album)
    #p songs.inspect
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
          { :artist => a, :title => album }
        )
      end
    end
      albums.each_with_index do |a,idx|
        a["guid"] = idx.to_s
      end
      return albums
  end
end
