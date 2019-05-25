export const common = {
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
    en: {
        logoutIsSuccessful:'Logout is successfull',
        pleaseLoginToContinue:'Please login to continue',
        delete_message:'Are you sure you want to delete this record?',
        cancel:'Cancel',
        delete:'Delete',
        edit:'Edit',
        yes: 'Yes',
        no: 'No',
        norecord: 'No records exist',
        processFail: 'Unable to process the request. Please try again',
        error:{
            loginfail: 'Unable to login. Please try again',
            processfail: 'Unable to process the request. Please try again',
        },
        remove:{
            error: 'Unable to delete the record. Please try again',
            confirm_message: 'Are you sure you want to delete this',
            confirm_message1: 'Are you sure you want to continue?',
        },
        login:{
            fail: 'Unable to login. Please try again',
        },
        forgotpassword:{
            success: "Forgot password link has been sent to your mail"
        },
        resetpassword:{
            success: "Password has been changed successfully"
        },
        back_to_login: 'Back to Login',
        back_to_sign_in: 'Back',
        select: 'Select',
        active: 'Active',
        inactive: 'Inactive',
        save: 'Save',
        no_permission: 'You do not have permission to do this operation',
        search: 'Search',
        submit:'Submit',
        reset:'Reset',
        ok:'Ok',
        action:'Action',
        processing:'Processing',
        sample_file_download:'Sample File Download',
        download : 'Download',
        upload:'Upload',
        bulk_upload:'Bulk Upload',
        no_data:'No data',
        created_date_time:'Created Date & Time',
        modified_date_time:'Modified Date & Time',
        download_sample_file:'Download Sample File',
        personal_information:'Personal Information',
        address_information:'Address Information',
        back_btn:'Back',
    },
}