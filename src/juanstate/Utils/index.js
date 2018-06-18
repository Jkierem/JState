export const objectToString = (object) =>{
	let atts = countAttributes(object);
	let i = 0;
	let value = "{ "
	for (var att in object) {
		if (object.hasOwnProperty(att)) {
			if( typeof(object[att]) === "object" ){
				value += att+": "+objectToString(object[att])
			}else{
				value += att + ": " + object[att]
			}
			if( i !== atts - 1 ){
				value+=", "
			}
		}
		i++;
	}
	value += " }"
	return value;
}

export const countAttributes = (object) =>{
	let count = 0;
	for (let att in object) {
		if (object.hasOwnProperty(att)) {
			count++;
		}
	}
	return count;
}

export const shallowObjectEquals = (obj1 , obj2) =>{
	if( typeof(obj1) === "object" && typeof(obj2) === "object" ){
		for (let key in obj1) {
			if (obj1.hasOwnProperty(key)) {
				if( typeof(obj1[key]) !== "object" && typeof(obj2[key]) !== "object" ){
					if( obj1[key] !== obj2[key] ){
						return false;
					}
				}else{
					if( !shallowObjectEquals( obj1[key] , obj2[key] ) ){
						return false;
					}
				}
			}
		}
		return true;
	}else{
		return obj1 === obj2
	}
}
