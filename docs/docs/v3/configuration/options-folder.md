# Options Folder <Badge type="warning" text="REQUIRED" />

This is something that makes v3 less complicated than v2. Folder with settings instead of a 500-line list. Options Folder Handler!

```js
const { Dashboard } = require('discord-dashboard')

new Dashboard(/*ENGINE*/)
    ...
    .setOptionsFolder(path.join(__dirname, './DBD_Categories'))
    ...
```

## Options Files Structure

The options folder structure is as follows:
- The **DBD_CATEGORIES** directory should contain **CATEGORIES** subdirectories,
- The **CATEGORIES** subdirectories contain **OPTIONS** (js files), 
- **OPTIONS** files conform to the structure (look at Options Files Structure).

![Options Files Structure](/images/dbd_options_folder.png)

<Badge type="tip" text="RELEVANT" /> `*.disabled.js` option files are ignored by Discord-Dashboard handler.

<Badge type="tip" text="RELEVANT" /> Categories and options are displayed alphabetically by their ids in the Dashboard.


### All FormTypes excluding CustomComponent

- <Badge type="warning" text="REQUIRED" /> `name: string` - Option name, shall be only string,
  <hr/>
- <Badge type="warning" text="REQUIRED" /> `get: async ({member, guild}) => FormTypeDATATYPE` - A function that returns the settings of a given function currently set for a given user and / or on a given server. It is assumed that no value means returning null and then the Dashboard will use the FormTypeDEFAULT set,
  <hr/>
- <Badge type="warning" text="REQUIRED" /> `set: async (newData, {member, guild}) => void` - Function that is called if the option has passed the 'serverSideValidation' test. At this point you should set its value in the database so that the get function can return the new value afterwards,
  <hr/>
- <Badge type="warning" text="REQUIRED" /> `type: FormTypeManager` - Option FormType ([listed there](/v3/formtypes)),
  <hr/>
- <Badge type="info" text="OPTIONAL" /> `id: string` - Option id, should be unique per category, if not defined, it was generated automatically from the file name,
  <hr/>
- <Badge type="info" text="OPTIONAL" /> `description: string` - Option description, can include HTML,
  <hr/>
- <Badge type="info" text="OPTIONAL" /> `themeOptions: ThemeOptionsManager` - Option Theme Options (most of the themes have their own Theme Options Manager for each Form Type),
  <hr/>
- <Badge type="info" text="OPTIONAL" /> <Badge type="tip" text="DEFAULT TRUE" /> `shouldBeDisplayed: async ({guild, member}) => boolean` - Function that should return a value if the Option should be displayed (in the API endpoint response). The member and guild parameters are parameters for the Discord.js client,
  <hr/>
- <Badge type="info" text="OPTIONAL" /> <Badge type="tip" text="DEFAULT NULL" /> `permissionsValidate: async ({guild, member}) => string | null` - A function that checks whether the user should have the option to manage the option or whether it should display it with an error. The text returned by this function is treated as the error text and the option is disabled, returning null means editing is allowed,
  <hr/>
- <Badge type="info" text="OPTIONAL" /> <Badge type="tip" text="DEFAULT NULL" /> `serverSideValidation: async (newData, {guild, member}) => string | null` - The function checks the settings sent to the Dashboard (after clicking the Submit button). Returning null means no error, returning the text will display it as an error for the given option (this option will not call the set function, but all others - unless they got an error here - will be saved).
### CustomComponent FormType

- <Badge type="warning" text="REQUIRED" /> `name: string` - Option name, shall be just string,
  <hr/>
- <Badge type="warning" text="REQUIRED" /> `type: CustomComponentFormType` - CustomComponent Option Builder from the THEME. If this FormType is used, only these three fields are needed,
  <hr/>
- <Badge type="info" text="OPTIONAL" /> `id: string` - Option id, should be unique per category, if not defined, it was generated automatically from the file name.

### Category Info

`__category_info.js` file is treated exceptionally. IT IS NOT AN OPTION, BUT HAVE TO BE INSIDE THE CATEGORY FOLDER. This is a supplement for the news about the category in which the options are found.

- <Badge type="info" text="OPTIONAL" /> `id: string` - Category Id, should be unique,
  <hr/>
- <Badge type="info" text="OPTIONAL" /> `name: string` - Category Name, that'd be great if it'd be unique,
  <hr/>
- <Badge type="info" text="OPTIONAL" /> <Badge type="tip" text="DEFAULT TRUE" /> `usePromiseResolveSystem: boolean` - Use Promises to GET options' values. To get them all one by one, get them simultaneously, which will save the necessary time.

