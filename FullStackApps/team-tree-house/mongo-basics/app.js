/*
	
	References:
	[1] https://github.com/hdngr/treehouse-mongo-basics (git repo)
	[2] https://docs.mongodb.com/master/tutorial/install-mongodb-on-ubuntu (ubuntu install guide)
	[3] http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/ (nodejs setup and quick start)
	[4] https://docs.mongodb.com/manual/
	[5] https://docs.mongodb.com/manual/introduction/
	[6] https://www.mongodb.com/nosql-explained
	[7] https://docs.mongodb.com/manual/reference/sql-comparison/
	[8] https://docs.mongodb.com/master/reference/method/load/
	[9] https://docs.mongodb.com/master/reference/method/Date/ (date formats)
	
	
	Mongo basics:
	1. start the mongo daemon
		$ mongod
		
	2. once the daemon is running, you can start the mongo shell in another cmd tab
		$ mongo
		
	3. to quit the shell and Ctrl + C to stop mongod
		> quit()
	
	note: you can start mongod as a bkgd service and carry on using the same cmd tab
		$ sudo service mongod start
		
		then start the shell and quit as normal. to stop mongod
		$ sudo service mongod stop
		
		you can check if the mongod service is running using
		$ ps aux OR ps -ef => look for mongod entry (use 'kill -9 [pid]' to kill the service)
		
	4. to create and switch to a database
		> use [database_name]
		
	5. to insert documents - post creates a collection, insert adds json obj
		> db.post.insert({.....})
	
	6. to view db collections in the current database
		> show collections OR > db.getCollectionNames()
	   
	   to show databases
	    > show dbs
	
	7. to list all records in that collection, i.e posts in this example
		> db.posts.find() // returns a collection of all the records
	   
	   to limit the number of documents returned
	   	> db.posts.find().limit(2) // returns 2 docs
	   
	   to view individual docs within a collection query it like an array
	   	> db.posts.find()[0]
	   
	   to display the number of documents in a collection
	   	> db.posts.count()
	   
	   to display the indexes (created automatically to facilitate quick lookups) on a particular collection
	   (view which collection property is defined as the index, generally the _id key)
	   	> db.posts.getIndexes()
	   
	   can be beneficial to create your own indexes - post title - aid searching for posts based on title
	   to create your own index on a particular document property use the createIndex() method
	    => pass in an object with the property to be indexed set as the key, and either a value of 1 (ASC) or -1 (DESC)
	     	and an optional object with a set of options as a 2nd parameter
	    > db.posts.createIndex({title: 1})
	    
	    run db.posts.getIndexes() to retrieve info about the collections indexes
	    
	    you can delete an index using dropIndex() method
	     - use getIndexes() to get the index name, not necessarily the prop name used in it's creation
	    > db.posts.dropIndex('title_1')
	
	8. to view all the files in the current dir (relative to the folder you were in when you launched the shell)
	 	> ls()
	 	
	9. to load a file (the load command is relative to the cwd (current working directory) of where you launch the mongo shell from.)
	 	> load('path/to/file')
	 	
	10. you can assign a document to a variable (doesn't support es6 let)
	 	> var post = db.posts.find()[1]
	 	
	 	you can reference properties of that document using dot notation.
	 	fields within a document can reference fields in other collections,
	 	e.g posts.author references the author in the users collection

 */