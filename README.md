# React Bee work component using redux

This a basic react table workbook

##  How to install

```bash
# Install dependencies
cd reactspeedtable
npm install

Main plot
 Uses classical redux pattern, with store and reducers.
 Uses axios for backend http client to get backend information.

## How to run

### The backend server
Backend data is coming from https://uxcandy.com/~shapoval/test-task-backend/?developer=Name

```bash
npm start
This will run the client at localhost:3000
 Check the page in desired Browser

 Best viewed in Firefox, Chrome

 # Table libraries
  Uses react-bootstrap-table-next as base and filter react-bootstrap-table2-filter
 CSS  Semantic UI for headers, messages like Loading, Error no data
      Bootstrap 4 for table component and override component
	  
	Plot
   Uses redux, redux-form as pattern.
   Consists of components: list and form 
   And actions with reducers
   
     Scheme:    Main page (List)  -> Links: list | add new 
	                              and 
								  Login ->  login.js  login form which is saved in cookie 
								  list -> list of all tasks per developer
								    list item clickable only when Authorized 
								  form -> add | edit (sent as get params)
	  
	 Currently there is Error CORS for edit submit, please check if it's on server side 
	  
	To view online
   http://norwaydict.com/reactbee
      Click on any link in the page 
	  (it will for now mask as norwaydict main site hrefs, but it works as expected)
	  
	  
  Enjoy the app and do call if any errors occur.



