## BlocketStatsCrawler


To populate the elastic search index you will need node.js and npm installed. 
If you have homebrew installed this is easily done in the terminal by entering:

`brew install node`

Enter 
`node -v`
and
`npm -v` to see that they were installed properly

Once Node and NPM are installed and if the elasticsearch engine is running you can start indexing by typing:

`node js/retrieval.js`

from the project directory. There should be a ton of prints indicating that it is working. 
OBS: elasticsearch posts are not synchronous so inserts need not be made in the same order they appear in the list on the web! 
