require 'sinatra'
require 'pry' 				if development?
require 'sinatra/reloader' 	if development?
require 'logger'

enable :logging

logger = Logger.new("logs/gmail.log")
logger.info("Sinatra started...")

get '/' do 
	erb :gmail
end

post '/archive' do
	logger.info("Email deleted: #{params}")
	'Success: email deleted and archived...'
end

get '/compose' do
	logger.info("opening compose window")
	erb :compose	
end

post '/send' do
	logger.info("Email sent: #{params}")
	'Success: email sent...'
end

