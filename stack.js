class Stack{
  constructor(value) {
    this.data = [value];
  }
  
  pop() {
  	if (this.data.length) {
  		return this.data.splice(this.data.length - 1);
  	}
  	return null;
  }
  
  peek() {
  	return this.data[this.data.length];
  }
  
  push(value) {
  	this.data.concat([value]);
  	return this;
  }
  
  isEmpty() {
  	return this.data.length == 0;
  }
  
}