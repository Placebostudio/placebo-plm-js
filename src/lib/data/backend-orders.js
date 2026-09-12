import { STORAGE_KEYS } from "../constants";
import { getItems } from "./storage";

const BASE_URL = "https://placebo-plm-js-backend.onrender.com/api";

const currentUser = getItems(STORAGE_KEYS.logged_user);


// ============================================================
// ORDER REPOSITORY
// ============================================================

const orderRepository = {

    async getAll(filters = {}) {

        const params = new URLSearchParams({
            ...filters,
            user_id: currentUser.id
        });

        const response = await fetch(
            `${BASE_URL}/orders?${params}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to get orders"
            );
        }

        return data;
    },

    async getById(id) {

        const params = new URLSearchParams({
            user_id: currentUser.id
        });

        const response = await fetch(
            `${BASE_URL}/orders/${id}?${params}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to get order"
            );
        }

        return data;
    },

    async create(data) {

        const response = await fetch(
            `${BASE_URL}/orders`,
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
                result.error || "Failed to create order"
            );
        }

        return result;
    },

    async update(id, data) {

        const response = await fetch(
            `${BASE_URL}/orders/${id}`,
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
                result.error || "Failed to update order"
            );
        }

        return result;
    },

    async delete(id) {

        const response = await fetch(
            `${BASE_URL}/orders/${id}?user_id=${encodeURIComponent(currentUser.id)}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to delete order"
            );
        }

        return result;
    },

    async softDelete(id) {

        const response = await fetch(
            `${BASE_URL}/orders/${id}/soft_delete`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: currentUser.id
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to soft delete order"
            );
        }

        return result;
    }
};


// ============================================================
// ORDER LINE REPOSITORY
// ============================================================

const orderLineRepository = {

    async getAll(filters = {}) {

        const params = new URLSearchParams({
            ...filters,
            user_id: currentUser.id
        });

        const response = await fetch(
            `${BASE_URL}/order_lines?${params}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to get order lines"
            );
        }

        return data;
    },

    async getById(id) {

        const response = await fetch(
            `${BASE_URL}/order_lines/${id}?user_id=${encodeURIComponent(currentUser.id)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to get order line"
            );
        }

        return data;
    },

    async create(data) {

        const response = await fetch(
            `${BASE_URL}/order_lines`,
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
                result.error || "Failed to create order line"
            );
        }

        return result;
    },

    async update(id, data) {

        const response = await fetch(
            `${BASE_URL}/order_lines/${id}`,
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
                result.error || "Failed to update order line"
            );
        }

        return result;
    },

    async delete(id) {

        const response = await fetch(
            `${BASE_URL}/order_lines/${id}?user_id=${encodeURIComponent(currentUser.id)}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to delete order line"
            );
        }

        return result;
    },

    async softDelete(id) {

        const response = await fetch(
            `${BASE_URL}/order_lines/${id}/soft_delete`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: currentUser.id
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to soft delete order line"
            );
        }

        return result;
    },

    async getByOrderId(orderId) {

        const params = new URLSearchParams({
            order_id: orderId,
            user_id: currentUser.id
        });

        const response = await fetch(
            `${BASE_URL}/order_lines?${params}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to get order lines"
            );
        }

        return data;
    }
};


// ============================================================
// ORDER ADDITIONAL COST REPOSITORY
// ============================================================

const orderAdditionalCostRepository = {

    async getAll(filters = {}) {

        const params = new URLSearchParams({
            ...filters,
            user_id: currentUser.id
        });

        const response = await fetch(
            `${BASE_URL}/order_additional_costs?${params}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to get additional costs"
            );
        }

        return data;
    },

    async getById(id) {

        const response = await fetch(
            `${BASE_URL}/order_additional_costs/${id}?user_id=${encodeURIComponent(currentUser.id)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to get additional cost"
            );
        }

        return data;
    },

    async create(data) {

        const response = await fetch(
            `${BASE_URL}/order_additional_costs`,
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
                result.error ||
                "Failed to create additional cost"
            );
        }

        return result;
    },

    async update(id, data) {

        const response = await fetch(
            `${BASE_URL}/order_additional_costs/${id}`,
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
                result.error ||
                "Failed to update additional cost"
            );
        }

        return result;
    },

    async delete(id) {

        const response = await fetch(
            `${BASE_URL}/order_additional_costs/${id}?user_id=${encodeURIComponent(currentUser.id)}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error ||
                "Failed to delete additional cost"
            );
        }

        return result;
    },

    async softDelete(id) {

        const response = await fetch(
            `${BASE_URL}/order_additional_costs/${id}/soft_delete`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: currentUser.id
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error ||
                "Failed to soft delete additional cost"
            );
        }

        return result;
    },

    async getByOrderId(orderId) {

        const params = new URLSearchParams({
            order_id: orderId,
            user_id: currentUser.id
        });

        const response = await fetch(
            `${BASE_URL}/order_additional_costs?${params}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error ||
                "Failed to get additional costs"
            );
        }

        return data;
    }
};


export {
    orderRepository,
    orderLineRepository,
    orderAdditionalCostRepository
};