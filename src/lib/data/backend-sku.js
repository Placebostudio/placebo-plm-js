import { STORAGE_KEYS } from "../constants";
import { getItems } from "./storage";

const BASE_URL = "https://placebo-plm-js-backend.onrender.com/api";

const currentUser = getItems(STORAGE_KEYS.logged_user);

const skuRepository = {

    // ============================================================
    // STORED SKU ARRAYS
    // ============================================================

    allSKUS: [],

    filteredSKUS: [],

    template: [],


    // ============================================================
    // GET SKU TEMPLATE
    // ============================================================

    async getAll() {

        const response = await fetch(
            `${BASE_URL}/sku?user_id=${encodeURIComponent(currentUser.id)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to get SKU structure"
            );
        }

        this.template = data;

        this.allSKUS = this.buildSKUs();

        this.filteredSKUS = [...this.allSKUS];

        return data;
    },


    // ============================================================
    // BUILD ALL SKUS
    // ============================================================

    buildSKUs() {

        if (
            !this.template ||
            this.template.length === 0
        ) {
            return [];
        }

        const sectors =
            [...this.template]
                .filter(sector => !sector.spam)
                .sort(
                    (a, b) =>
                        a.placement - b.placement
                );


        let combinations = [""];


        sectors.forEach(sector => {

            let values =
                Array.isArray(sector.allowed_values)
                    ? sector.allowed_values
                    : [];


            // ----------------------------------------------------
            // YEAR
            // ----------------------------------------------------

            if (sector.name === "Year") {

                const currentYear =
                    new Date().getFullYear();

                values = [];

                for (
                    let year = currentYear;
                    year <= currentYear + 10;
                    year++
                ) {
                    values.push(
                        String(year)
                    );
                }
            }


            // ----------------------------------------------------
            // REQUIRED SECTOR WITH NO VALUES
            // ----------------------------------------------------

            if (
                values.length === 0 &&
                sector.required
            ) {
                return;
            }


            // ----------------------------------------------------
            // OPTIONAL SECTOR
            // ----------------------------------------------------

            if (!sector.required) {

                values = [
                    "",
                    ...values
                ];
            }


            const newCombinations = [];


            combinations.forEach(
                combination => {

                    values.forEach(
                        value => {

                            const formattedValue =
                                String(value);


                            if (
                                combination === ""
                            ) {

                                newCombinations.push(
                                    formattedValue
                                );

                            } else if (
                                formattedValue === ""
                            ) {

                                newCombinations.push(
                                    combination
                                );

                            } else {

                                newCombinations.push(
                                    `${combination}-${formattedValue}`
                                );
                            }

                        }
                    );

                }
            );


            combinations =
                newCombinations;
        });


        return combinations;
    },


    // ============================================================
    // FILTER EXISTING SKUS
    // ============================================================

    filterSKUs(input = "") {

        const search =
            String(input)
                .trim()
                .toLowerCase();


        if (!search) {

            this.filteredSKUS =
                [...this.allSKUS];

            return this.filteredSKUS;
        }


        this.filteredSKUS =
            this.allSKUS.filter(
                sku =>
                    sku
                        .toLowerCase()
                        .startsWith(search)
            );


        return this.filteredSKUS;
    },


    // ============================================================
    // CHECK IF SKU FITS TEMPLATE
    // ============================================================

    skuFitsTemplate(sku) {

        if (
            !sku ||
            !this.template ||
            this.template.length === 0
        ) {
            return false;
        }


        const sectors =
            [...this.template]
                .filter(sector => !sector.spam)
                .sort(
                    (a, b) =>
                        a.placement - b.placement
                );


        const parts =
            String(sku)
                .split("-");


        let partIndex = 0;


        for (const sector of sectors) {

            // ----------------------------------------------------
            // OPTIONAL SECTOR
            // ----------------------------------------------------

            if (!sector.required) {

                if (
                    partIndex >= parts.length
                ) {
                    continue;
                }
            }


            // ----------------------------------------------------
            // REQUIRED SECTOR MISSING
            // ----------------------------------------------------

            if (
                partIndex >= parts.length
            ) {
                return false;
            }


            const value =
                parts[partIndex];


            // ----------------------------------------------------
            // CHECK FORMAT
            // ----------------------------------------------------

            if (sector.format) {

                const expectedLength =
                    sector.format.length;

                if (
                    value.length !==
                    expectedLength
                ) {
                    return false;
                }
            }


            // ----------------------------------------------------
            // CHECK ALLOWED VALUES
            // ----------------------------------------------------

            if (
                Array.isArray(
                    sector.allowed_values
                ) &&
                sector.allowed_values.length > 0
            ) {

                if (
                    !sector.allowed_values.includes(
                        value
                    )
                ) {
                    return false;
                }
            }


            partIndex++;
        }


        // --------------------------------------------------------
        // TOO MANY VALUES
        // --------------------------------------------------------

        if (
            partIndex !== parts.length
        ) {
            return false;
        }


        return true;
    }
};


export {skuRepository};