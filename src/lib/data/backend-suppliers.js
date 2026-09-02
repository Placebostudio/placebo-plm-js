import { STORAGE_KEYS } from "../constants";

const BASE_URL = "https://placebo-plm-js-backend-1.onrender.com/api";

const currentUser = getItems(STORAGE_KEYS.logged_user);

const supplierRepository = {

    async getAll(filters = {}) {

        const params = new URLSearchParams({
            ...filters,
            user_id: currentUser.id
        });

        const response = await fetch(
            `${BASE_URL}/suppliers?${params}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to get suppliers");
        }

        return data;
    },

    async getById(id) {

        const response = await fetch(
            `${BASE_URL}/suppliers/${id}?user_id=${encodeURIComponent(currentUser.id)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to get supplier");
        }

        return data;
    },

    async create(data) {

        const response = await fetch(
            `${BASE_URL}/suppliers`,
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
            throw new Error(
                result.error || "Failed to create supplier"
            );
        }

        return result;
    },

    async update(id, data) {

        const response = await fetch(
            `${BASE_URL}/suppliers/${id}`,
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
            throw new Error(
                result.error || "Failed to update supplier"
            );
        }

        return result;
    },

    async softDelete(id) {

        const supplier = await this.getById(id);

        return await this.update(id, {
            ...supplier,
            spam: true
        });
    },

    async delete(id) {

        const response = await fetch(
            `${BASE_URL}/suppliers/${id}?user_id=${encodeURIComponent(currentUser.id)}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to delete supplier"
            );
        }

        return result;
    }
};

export default supplierRepository;