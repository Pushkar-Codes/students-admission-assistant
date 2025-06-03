package com.Rupankar.BackendJavaERP.Student.DTO;

import java.util.List;

public record AttributePageResponse(
        List<String> values,
        int page,
        int size,
        long totalElements,
        int totalPages
) {
}
