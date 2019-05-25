import {app} from '../config/app';

/**
 * Dashboard or Where you have customer Dropdown of 'customer' component
 * return the consumption unit string based utility type ID
 */
export const getConsumptionUnit = (componentInst,customerId) => {
    let utilityId = ''
    if(componentInst.props.auth.isTclAdminUser() && componentInst.customerInst){
        utilityId = componentInst.customerInst.getWrappedInstance().getUtilityTypeByCusId(customerId);
    }
    else{
        utilityId = componentInst.props.auth.getUtilityTypeId();
    }
    return app.consumptionUnit[utilityId] || app.consumptionUnit['UT0003'];
}

/**
 * return the consumption unit string based current page utility type ID
 */
export const consumpUnitByLoggedUSer = (componentInst) => {
    const utilityId = componentInst.props.auth.getPageUtilityType();
    return app.consumptionUnit[utilityId] || app.consumptionUnit['UT0003'];
}
