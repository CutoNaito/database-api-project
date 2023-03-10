import database from "../config/DBConfig";

export class Feedback {
    /**
     * @param id
     * @param id_zak
     * @param id_prod
     * @param title
     * @param text
     * 
     * @description Creates a new Feedback object
     */
    id: number | undefined;
    id_zak: number | undefined;
    id_prod: number | undefined;
    title: string | undefined;
    text: string | undefined;

    constructor(id?: number, id_zak?: number, id_prod?: number, title?: string, text?: string) {
        if (id) {
            this.id = id;
        }
        if (id_zak) {
            this.id_zak = id_zak;
        }
        if (id_prod) {
            this.id_prod = id_prod;
        }
        if (title) {
            this.title = title;
        }
        if (text) {
            this.text = text;
        }
    }

    async save() {
        /**
         * @description Saves the object to the database
         */
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
            const [result] = await database.execute("INSERT INTO feedback (id_zak, id_prod, title, text) VALUES (?, ?, ?, ?)", [this.id_zak, this.id_prod, this.title, this.text], (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    database.query("ROLLBACK");
                } else {
                    database.query("COMMIT");
                }
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async update() {
        /**
         * @description Updates the object in the database
        */
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
            const [result] = await database.execute("UPDATE feedback SET id_zak = ?, id_prod = ?, title = ?, text = ? WHERE id = ?", [this.id_zak, this.id_prod, this.title, this.text, this.id], (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    database.query("ROLLBACK");
                } else {
                    database.query("COMMIT");
                }
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async delete() {
        /**
         * @description Deletes the object from the database
        */
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
            const [result] = await database.execute("DELETE FROM feedback WHERE id = ?", [this.id], (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    database.query("ROLLBACK");
                } else {
                    database.query("COMMIT");
                }
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        /**
         * @description Returns all objects from the database
        */
        try {
            const [result] = await database.execute("SELECT * FROM feedback");
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getById() {
        /**
         * @description Returns the object from the database with the specified id
        */
        try {
            const [result] = await database.execute("SELECT * FROM feedback WHERE id = ?", [this.id]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getReport() {
        /**
         * @description Returns a summary of the feedbacks for the product
        */
        try {
            const [result] = await database.execute("SELECT * FROM feedback_on_product WHERE id_prod = ?", [this.id_prod]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async importData(path: string) {
        /**
         * @description Imports data from a file to the database
         * @param path Path to the CSV file
        */
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
            const [result] = await database.query("LOAD DATA INFILE '" + path + "' INTO TABLE feedback FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' (`name`, `price`, `size`)").then((result: any) => {
                database.query("COMMIT")
            }).catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}