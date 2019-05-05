const term = require( 'terminal-kit' ).terminal
// TODO: Create key pair / import key pair
// TODO: Load top level directory structure


keys = null
term('Choose keyfile: ')
term.fileInput(
	{ baseDir: '../' } ,
	(error,input) => {
		if (error) {
			term.red.bold( "\nAn error occurs: " + error + "\n" )
            process.exit()
		} else {
			term.green( "\nYour file is '%s'\n" , input )
        }

        try {
            keys = JSON.parse(input)
        } catch (e) {
            term.red.bold("\nError processing keyfile\n")
            process.exit()
        }
	}
)


