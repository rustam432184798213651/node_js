This is the simple application which works a web server which run via nodemon and the goal is to get text file of certain content and return json file. Let me show you what I am talking about with example:
So, imagine you run the server and then user send you txt file "text.txt" which has the following content pattern:
Name is Age;
Name2 is Age2;
...
NameN is AgeN;

As you can see the file only contains name of someone/something and their age.
Server would respond to request in the next way(In fact server will return json file): 
{
    "Name1": "Age1",
    "Name2": "Age2",
    ...
    "NameN": "AgeN"
}

