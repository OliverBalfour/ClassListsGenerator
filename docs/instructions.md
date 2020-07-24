# How To Use The Class Lists Generator

## Step 1: Creating a spreadsheet

The class lists generator needs a spreadsheet in a certain format with student names, friends they would like to be with, and other information, in order to correctly allocate classes. Either Google Sheets or Microsoft Excel can be used to create the spreadsheet. For simplicity's sake this tutorial focuses on Google Sheets, however you can copy the template into Excel and export as CSV the same way.

Here is a [Google Sheets template](https://docs.google.com/spreadsheets/d/1SSYvKtQz-YQKJdHrgddIavMlxPmrQXmNLzNnnxdQ4Mo/edit?usp=sharing). Go to File > Make a Copy, and share it with anybody else who needs access. Follow the instructions inside the spreadsheet. If you make multiple sheets for each class, make sure to copy them all into the same big sheet at the end.

## Step 2: Exporting your spreadsheet

Before you can use the app, you need to save the spreadsheet in Sheets. However, it must be saved in the special CSV format, as this is easier for the app to understand. To export a CSV file, go to File > Download > Comma Separated Values (CSV). Save the file somewhere you will remember.

![How to export a CSV in Google Sheets](./images/sheets-csv.png)

Once you have a CSV file, you can proceed to the next step.

## Step 3: Importing the spreadsheet into the app

First, you will need to open up the app. Open [this link](https://oliverbalfour.github.io/ClassListsGenerator/) in a new tab (right click > open in new tab). If you get a 404 error, make sure there is a single slash (`/`) at the end of the URL.

When you open up the app, it will ask you to import a spreadsheet. Click 'Import', and then find the CSV file you just saved. If all goes well, it should import correctly without any error messages.

### Troubleshooting

This section includes sources of potential problems with importing the spreadsheet exported in the previous step. Feel free to skip it if no issues were encountered.

1. Are all of the names exactly the same across the names, friends and must/can't be with columns? Across the teachers list and possible teachers column?
2. Have you accidentally edited any cells which are not yellow, such as column headings or other random cells which should not be there?
3. Have you got any particularly unusual names for categories?

### After the import

After successfully importing the spreadsheet, you should be presented with several columns as depicted below:

![Example screenshot of dummy class list](./images/view-dummy.png)

Now we can progress to using the app to generate class lists according to the constraints in the spreadsheet.

## Step 4: Using the app to generate class lists

Now, press "Keep Working" to start running the class optimisation process. This will calculate thousands of possible class lists and quickly improve the list. If you click the "View Issues" button you'll notice the number of issues decreasing. It will automatically stop when it has stopped improving. You can pause and resume the process or restart ("Start Over") at any time.

## Step 5: Tweaking your class lists

For various reasons, the class lists generated may have certain problems. There are two ways of fixing problems in this app:

1. Updating parameters.

Click Edit and then the pencil next to the student you would like to move. Then, consider why the change needs to be made - does this student need to be separated from another student? If so, update the 'cannot be with' list. Can the student not be with a certain teacher? Change the 'possible teachers' list. If you change these parameters rather than force the student into another class yourself, the computer will understand why you want to make the change and will be able to fix it itself when you unpause the program.

If the reason for a change is too complex to express in the list of parameters offered, consider unticking all teachers except that of the class you would like them moved to, or pressing 'start over'.

2. Directly changing classes.

Click Edit and then the pencil next to the student you would like to move. Then directly under the name click the teacher name select field and choose the desired teacher. *Although faster, this approach is not recommended.* It is only recommended for finalising the class list. This is because manually overriding the program means if you unpause it it will become confused and think your change was a mistake and most likely undo it. Instead, you should change an underlying parameter so the computer will automatically move the student for you. This is because if the information fed into the program was complete/correct, it would have already made the change you desire.

## Step 6: Exporting your chosen class list

There are two ways of exporting the class list. One is to print the website. Many computers allow you to print to a PDF which is saved to your computer instead of printing an actual hardcopy. The other option is to export a CSV spreadsheet file which you can open with Google Sheets or Microsoft Excel.

Click the three dots in the top right when you are not in editing mode, and then click `Export spreadsheet (CSV)`. This will download another CSV file for you with the generated class lists. When you have this file, you can import it into Excel or Google Sheets again. In Google Sheets, you do this by pressing File > Import > Upload, then finding your CSV file.

## Step 7: Celebrate!
