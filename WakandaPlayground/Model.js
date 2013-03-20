
guidedModel =// @startlock
{
	Person :
	{
		entityMethods :
		{// @endlock
			getChildren:function()
			{// @lock
				return this.motherOf.add(this.fatherOf);
			
			}// @startlock
		},
		numberOfChildren :
		{
			onGet:function()
			{// @endlock
				return this.motherOf.length + this.fatherOf.length;
			}// @startlock
		},
		fullName :
		{
			onSet:function(value)
			{// @endlock
				var names = value.split(" ", 2);
				this.firstName = names[0];
				this.lastName = names[1];
			},// @startlock
			onGet:function()
			{// @endlock
				var nameTotal = 0; //The unique value based on populated full name elements
				//firstName = 1, lastName = 2
				nameTotal = (this.firstName == "" || this.firstName == null) ? nameTotal : nameTotal + 1;
				nameTotal = (this.lastName == "" || this.lastName == null) ? nameTotal : nameTotal + 2;
				
				switch (nameTotal) {
					//Go through each name scenerio in order of likelyhood
					case 0: //Nothing filled in
						return "No Name";
						break;
					case 1: //First name filled in
						return this.firstName; //Bob
						break;
					case 2: //Last name only
						return this.lastName;
					case 3: //First name & last name
						return this.firstName + " " + this.lastName; //Bob Wilson
						break;
					default: //all other scenarios
						return "No Name";
				}
			}// @startlock
		},
		methods :
		{// @endlock
			getFamilyObj:function(searchParam)
			{// @lock
				var buildChildren = function(){
					while(position < people.length) {
						if(people[position].numberOfChildren != 0){
							people[position].motherOf.forEach(function(element){
								people.push(element);
							});
							people[position].fatherOf.forEach(function(element){
								people.push(element);
							});
						}
						position ++;
					}
					people.shift();
					var childrenArray = [];
					people.forEach(function(element){
						childrenArray.push({fatherID: element.father.ID, ID: element.ID, firstName: element.firstName, lastName: element.lastName, salary: element.salary});
					});
					var familyObj = {
						parent: {ID: parent.ID, firstName: parent.firstName, lastName: parent.lastName, salary: parent.salary},
						children: childrenArray
					}
					return familyObj;
				}
					
				var parent = ds.Person.query('lastName == :1 && gender == "Male" && numberOfChildren != 0"', searchParam + '*')[0];
				var people = [parent];
				var position = 0;
				return buildChildren();
				
				
			},// @lock
			removeData:function()
			{// @lock
				ds.Person.remove();
				ds.Company.remove();
				return true;
			},// @lock
			createSampleData:function(numberOfPeople)
			{// @lock
				WP.generateCompanies();
				WP.generatePeople(numberOfPeople);
				return true;
			}// @startlock
		}
	}
};// @endlock
