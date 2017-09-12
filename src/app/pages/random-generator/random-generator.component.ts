import { Component, Input } from '@angular/core';

@Component({
  selector: 'krz-random-generator',
  templateUrl: './random-generator.component.html'
})
export class RandomGeneratorComponent {

    @Input() itemsCount: number;
    constructor() {}

    generator(): any {
        let data = [];
        let loremText = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem eum fugiat quo voluptas nulla pariatur";
        let minPrice = 10.00;
        let maxPrice = 250.00;
        let startDate = new Date(2014, 0, 1);
        let endDate = new Date();
        let countries = ['Belgium', 'Bulgaria', 'Romania', 'Canada', 'Mexico', 'Denmark', 'France', 'Germany', 'Italy', 'Russia', 'Spain','China','Japan'];
        let types =  ['Shirt', 'Swimwear', 'Underwear', 'Pants', 'Jacket', 'Shoes', 'Underwear', 'Bag', 'Gloves', 'Glasses', 'Socks'];
        let brands = ['Adidas', 'Reebok', 'Nike', 'Puma'];
        let genders = ['Male', 'Female', 'Unisex'];
        let colors= ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 'silver', 'teal', 'white', 'yellow'];

        for (let i = 0; i < this.itemsCount; i ++) {
            let newItem: any = {};
            newItem.objectId = this.generateRandomObjectId();
            newItem.price = this.getRandomArbitrary(minPrice, maxPrice).toFixed(2);
            newItem.date = this.getRandomDate(startDate, endDate);
            newItem.type = this.getRandomItemFromArray(types);
            newItem.name = this.getRandomLoremWord(loremText);
            newItem.brand = this.getRandomItemFromArray(brands);
            newItem.gender = this.getRandomItemFromArray(genders);
            newItem.color = this.getRandomItemFromArray(colors);
            newItem.country = this.getRandomItemFromArray(countries);

            data.push(newItem);
        }

        return data;
    }

    getRandomArbitrary(min: any, max: any): any {
        return Math.random() * (max - min) + min;
    } //returns decimal number (ex. 1,323442)

    getRandomInt(min: any, max: any): any {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } //returns whole number (example 333)

    getRandomDate(start: any, end: any) {
        let date = new Date(+start + Math.random() * (end - start));
        return date.toISOString().slice(0, 10);
    }

    generateRandomObjectId() {
        let s = (s: any) => {
            return Math.floor(s).toString(16);
        };
        return s(Date.now() / 1000) + ' '.repeat(16).replace(/./g, () => {
            return s(Math.random() * 16);
        });
    }

    getRandomItemFromArray(items: any): any {
        let item = items[Math.floor(Math.random() * items.length)];
        return item.charAt(0).toUpperCase() + item.slice(1);
    }

    getRandomLoremWord(loremText: any): any {
        let loremArray = loremText.split(' ');
        return this.getRandomItemFromArray(loremArray);
    }

    generateAndDownload(): any {
        let data = this.generator();
        this.download(JSON.stringify(data, null, "\t"), 'data.json', 'text/json');
    }

    download(text: any, name: any, type: any): void {
        let a = document.createElement("a");
        let file = new Blob([text], {type: type});
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    }
}
