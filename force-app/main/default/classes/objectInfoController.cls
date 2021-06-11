public with sharing class objectInfoController {
    @AuraEnabled(cacheable=true)
    public static sObject getUserInfo(String objApiName, String fields, Id currentRecordId){
      
        String query = 'SELECT ';
        query += fields;
        query += ' FROM ' + objApiName + ' WHERE IsDeleted = false';

        if(currentRecordId != '' && currentRecordId != null){
            query += ' AND Id =: currentRecordId';
        }

        query +=' LIMIT 1 WITH SECURITY_ENFORCED';

        try {
            return Database.query(query);
        } catch(exception e) {
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        
    }
}