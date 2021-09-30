import * as TYPES from "../actions/types";

export const getRole = level => {
	if(level === 0 ){
		return [TYPES.levelOrder, TYPES.levelReOrder];
	}else if(level === 1 ){
		return [TYPES.levelViewBill, TYPES.levelOrder, TYPES.levelReOrder];
	}else if(level === 2 ){
		return [TYPES.levelViewBill, TYPES.levelPrintBill, TYPES.levelOrder, TYPES.levelReOrder];
	}else if(level === 3 ){
		return [TYPES.levelViewBill, TYPES.levelPrintBill, TYPES.levelOrder, TYPES.levelReOrder, TYPES.levelPaid];
	}else if(level === 4 ){
		return [TYPES.levelViewBill, TYPES.levelPrintBill, TYPES.levelOrder, TYPES.levelReOrder, TYPES.levelPaidDirect];
	}else if(level === 5 ){
		return [TYPES.levelViewBill, TYPES.levelPrintBill, TYPES.levelPaidDirect];
	}else if(level === 6 ){
		return [TYPES.levelOrder, TYPES.levelReOrder, TYPES.levelCancelOrder];
	}else if(level === 7 ){
		return [TYPES.levelOrder, TYPES.levelReOrder, TYPES.levelCancelOrder, TYPES.levelViewBill];
	}else if(level === 8 ){
		return [TYPES.levelOrder, TYPES.levelReOrder, TYPES.levelCancelOrder, TYPES.levelViewBill, TYPES.levelPrintBill];
	}else if(level === 9 ){
		return [TYPES.levelOrder, TYPES.levelReOrder, TYPES.levelCancelOrder, TYPES.levelViewBill, TYPES.levelPrintBill, TYPES.levelPaid];
	}else if(level === 10 ){
		return [TYPES.levelOrder, TYPES.levelReOrder, TYPES.levelCancelOrder, TYPES.levelViewBill, TYPES.levelPrintBill, TYPES.levelPaidDirect];
	}else if(level === 11 ){
		return [TYPES.levelCancelOrder, TYPES.levelViewBill, TYPES.levelPrintBill, TYPES.levelPaidDirect];
	}else return [];
}


export const TIME_FOR_FETCH_TABLE = 5;
