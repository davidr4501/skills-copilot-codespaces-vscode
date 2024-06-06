function skillsMember() {
  let member = {
    name: 'John Doe',
    age: 30,
    address: '123 Main St',
    skills: ['HTML', 'CSS', 'JavaScript'],
    greet: function () {
      console.log(`Hello, my name is ${this.name} and I know ${this.skills.join(', ')}`);
    }
  };
  member.greet();
}