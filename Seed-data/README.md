Below are the steps to load seed data into mongodb

1. Open the application mongod.exe
2. Open the application mongo.exe
3. In mongo console give command - use <database-name>
4. Execute below commands by placing respective file contents
   db.admin.insertMany()
   db.attendee.insertMany()
   db.faculty.insertMany()
   db.presenter.insertMany()
5. Seed data is loaded into mongo database.