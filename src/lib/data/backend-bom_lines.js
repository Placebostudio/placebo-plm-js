import { STORAGE_KEYS } from "../constants";

const BASE_URL = "https://placebo-plm-js-backend-1.onrender.com/api";

const currentUser = getItems(STORAGE_KEYS.logged_user);

const bomLineRepository = {

    async getAll() {

        const response = await fetch(
            `${BASE_URL}/bom_lines?user_id=${encodeURIComponent(currentUser.id)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to get BOM lines");
        }

        return data;
    },

    async getByProduct(productId) {

        const params = new URLSearchParams({
            product_id: productId,
            user_id: currentUser.id
        });

        const response = await fetch(
            `${BASE_URL}/bom_lines?${params}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to get BOM lines");
        }

        return data;
    },

    async getById(id) {

        const response = await fetch(
            `${BASE_URL}/bom_lines/${id}?user_id=${encodeURIComponent(currentUser.id)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to get BOM line");
        }

        return data;
    },

    async create(data) {

        const response = await fetch(
            `${BASE_URL}/bom_lines`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...data,
                    user_id: currentUser.id
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Failed to create BOM line");
        }

        return result;
    },

    async update(id, data) {

        const response = await fetch(
            `${BASE_URL}/bom_lines/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...data,
                    user_id: currentUser.id
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Failed to update BOM line");
        }

        return result;
    },

    async delete(id) {

        const response = await fetch(
            `${BASE_URL}/bom_lines/${id}?user_id=${encodeURIComponent(currentUser.id)}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to delete BOM line");
        }

        return data;
    }
};

export default bomLineRepository;