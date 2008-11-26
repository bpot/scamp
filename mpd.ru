require 'mpd_rack'

use Rack::ShowExceptions
run MPDRack.new
