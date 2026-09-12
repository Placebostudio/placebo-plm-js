import { STORAGE_KEYS } from "../constants";
import { getItems } from "./storage";

const BASE_URL = "https://placebo-plm-js-backend.onrender.com/api";

const currentUser = getItems(STORAGE_KEYS.logged_user);

const materialRepository = {

    async getAll(filters = {}) {

        const params = new URLSearchParams({
            ...filters,
            user_id: currentUser.id
        });

        const response = await fetch(
            `${BASE_URL}/materials?${params}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to get materials");
        }

        return data;
    },

    async getById(id) {

        const materialResponse = await fetch(
            `${BASE_URL}/materials/${id}?user_id=${encodeURIComponent(currentUser.id)}`
        );

        const material = await materialResponse.json();

        if (!materialResponse.ok) {
            throw new Error(
                material.error || "Failed to get material"
            );
        }

        const params = new URLSearchParams({
            material_id: id,
            user_id: currentUser.id
        });

        const bomResponse = await fetch(
            `${BASE_URL}/bom_lines?${params}`
        );

        const bomLines = await bomResponse.json();

        if (!bomResponse.ok) {
            throw new Error(
                bomLines.error || "Failed to get BOM lines"
            );
        }

        return {
            ...material,
            bom_lines: bomLines
        };
    },

    async create(data) {

        const response = await fetch(
            `${BASE_URL}/materials`,
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
                result.error || "Failed to create material"
            );
        }

        return result;
    },

    async update(id, data) {

        const {
            bom_lines,
            ...materialData
        } = data;

        const response = await fetch(
            `${BASE_URL}/materials/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...materialData,
                    user_id: currentUser.id
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to update material"
            );
        }

        if (bom_lines !== undefined) {

            const existingResponse = await fetch(
                `${BASE_URL}/bom_lines?` +
                new URLSearchParams({
                    material_id: id,
                    user_id: currentUser.id
                })
            );

            const existingLines = await existingResponse.json();

            if (!existingResponse.ok) {
                throw new Error(
                    existingLines.error ||
                    "Failed to get existing BOM lines"
                );
            }

            const existingIds = new Set(
                existingLines.map(line => line.id)
            );

            const receivedIds = new Set(
                bom_lines
                    .filter(line => line.id != null)
                    .map(line => line.id)
            );

            for (const line of existingLines) {

                if (!receivedIds.has(line.id)) {

                    await this.deleteBomLine(line.id);
                }
            }

            for (const line of bom_lines) {

                if (existingIds.has(line.id)) {

                    await this.updateBomLine(
                        line.id,
                        line
                    );

                } else {

                    await this.createBomLine({
                        ...line,
                        material_id: id
                    });
                }
            }
        }

        return await this.getById(id);
    },

    async delete(id) {

        const response = await fetch(
            `${BASE_URL}/materials/${id}?user_id=${encodeURIComponent(currentUser.id)}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to delete material"
            );
        }

        return data;
    },

    async createBomLine(data) {

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
            throw new Error(
                result.error || "Failed to create BOM line"
            );
        }

        return result;
    },

    async updateBomLine(id, data) {

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
            throw new Error(
                result.error || "Failed to update BOM line"
            );
        }

        return result;
    },

    async deleteBomLine(id) {

        const response = await fetch(
            `${BASE_URL}/bom_lines/${id}?user_id=${encodeURIComponent(currentUser.id)}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to delete BOM line"
            );
        }

        return result;
    }
};

export {materialRepository};