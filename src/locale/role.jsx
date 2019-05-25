export const role = {
    /**
    * Gets the programmatic name of the entire locale, with the language, 
    *   country and variant separated by underbars. The Language is always lower case, 
    *   and country is always upper case. If the language is missing, 
    *   the string will begin with an underscore character. 
    *   If both the language and country fields are missing, 
    *   this function will return the empty string, 
    *   even if the variant field is filled in (you cannot have a locale with just a variant-- 
    *   the variant must accompany a valid language or country code). Examples: "en"
    *
    */
    en:{
        page:{
            title: 'Roles And Permissions'
        },
        add_role: 'Add Role',
        role_name: 'Role Name',
        role_type: 'Role Type',
        add:{
            success: 'Role added successfully',
            error: 'Unable to add the role. Please try again.'
        },
        permission:{
            empty: 'Please select atleast one value',
            add:{
                success: 'Permission added successfully',
                error: 'Unable to add the permission. Please try again.'
            },
            display:{
                error: 'Something went wrong. Please try again'
            }
        },
    }
}