class Pet {
    id: number;
    adid: number;
    name: string;
    animal: string;
    breed: string;
    color: string;


    constructor(name: string, animal: string, breed: string, color: string, adid: number, id?: number) {
        this.name = name;
        this.animal = animal;
        this.id = id;
        this.adid = adid;
        this.breed = breed;
        this.color = color;
    }

}

export default Pet;