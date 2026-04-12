import apiClient from "@/config/axios";

export const propertyService = {
    // Fetch properties (with optional filters)
    getAllProperties: async (filters?: Record<string, unknown>) => {
        try {
            const response = await apiClient.get("/properties", {
                params: filters,
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching properties:", error);
            throw error;
        }
    },

    // Search properties by query string
    searchProperties: async (query: string) => {
        try {
            const response = await apiClient.get("/properties/search", {
                params: { q: query },
            });
            return response.data;
        } catch (error) {
            console.error("Error searching properties:", error);
            throw error;
        }
    },

    // Get a specific property by ID
    getPropertyById: async (id: string) => {
        try {
            const response = await apiClient.get(`/properties/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching property by ID:", error);
            throw error;
        }
    },
};
