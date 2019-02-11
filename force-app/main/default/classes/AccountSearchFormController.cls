public with sharing class AccountSearchFormController {
    
    private static final Integer INTEGER_MAX_VALUE = 2147483647;

    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts(String accountName, String phone, String type, String dunsNumber) {
        String queryStr = 'SELECT ID, Name, Phone, Type, DunsNumber From Account ';
        String queryCond = '';

        queryCond = createConditionSingle(queryCond, accountName, true, true, null, 'Name');
        queryCond = createConditionSingle(queryCond, phone, true, true, null, 'Phone');
        queryCond = createConditionSingle(queryCond, type, false, false,  null, 'Type');
        queryCond = createConditionSingle(queryCond, dunsNumber, false, true, null, 'DunsNumber');

        if(!String.isBlank(queryCond)){
            queryStr = queryStr + ' WHERE ' + queryCond;
        }

        List<Account> accountList = Database.query(queryStr);

        return accountList;
    }

    private static String createConditionSingle(
        String prevCond, String searchString, Boolean preLike, Boolean postLike, Decimal searchNumeric, String fieldName ) {
        
        String queryCond = '';
        if ( !String.isBlank( prevCond ) ) {
            queryCond = prevCond;
        }
        if ( !String.isBlank( searchString ) || searchNumeric != null ) {
            if ( !String.isBlank( queryCond ) ) {
                queryCond += ' AND ';
            }
            if ( searchNumeric != null ) {
                String searchValue = String.valueOf( searchNumeric );
                // Integer 型の最大値を超えている場合は「.0」を付加して Double 型と認識させる
                if ( searchNumeric > INTEGER_MAX_VALUE ) {
                    searchValue += '.0';
                }
                queryCond +=
                    '( ' + fieldName + ' = ' + searchValue + ' )';
            } else {
                String eqOrLike = ( preLike || postLike ? ' LIKE ' : ' = ' );
                String preLikeChar = ( preLike ? '%' : '' );
                String postLikeChar = ( postLike ? '%' : '' );
                queryCond +=
                    '( ' + fieldName + eqOrLike + '\'' + preLikeChar +
                    String.escapeSingleQuotes( searchString ) + postLikeChar + '\' )';
            }
        }
        return queryCond;
    }

}
