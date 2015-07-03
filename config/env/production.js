/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

var parseRedisUrl = function( url ) {
	var parsed = require( 'url' ).parse( url );
	var password = (parsed.auth || '').split( ':' )[1];

	return {
		hostname: parsed.hostname,
		port: parsed.port,
		password: password
	};
};


var redis = parseRedisUrl( process.env.REDIS_URL || "redis://localhost:6379" );

module.exports = {

	/***************************************************************************
	 * Set the default database connection for models in the production        *
	 * environment (see config/connections.js and config/models.js )           *
	 ***************************************************************************/

	models: {
	  connection: 'someMongodbServer'
	},

	/***************************************************************************
	 * Set the port in the production environment to 80                        *
	 ***************************************************************************/

	// port: 80,

	/***************************************************************************
	 * Set the log level in production environment to "silent"                 *
	 ***************************************************************************/

	log: {
		level: "debug",

		rollbar: {
			on: true,
			token: process.env.ROLLBAR_ACCESS_TOKEN,
			endpoint: process.env.ROLLBAR_ENDPOINT
		}
	},

	session: {
		host: redis.hostname,
		port: redis.port,
		db: 0,
		pass: redis.password
	},

	connections: {
		someMongodbServer: {
			adapter: 'sails-mongo',
			url: process.env.MONGOLAB_URI
		}
	},

	passport: {
		facebook: {
			options: {
				clientID : process.env.FACEBOOK_CLIENTID,
				clientSecret : process.env.FACEBOOK_CLIENTSECRET,
			}
		}
	}

};
