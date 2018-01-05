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
	for (var att in object) {
		if (object.hasOwnProperty(att)) {
			count++;
		}
	}
	return count;
}
