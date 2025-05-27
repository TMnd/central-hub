package pt.amaralsoftware.models;

import java.io.Serializable;

public class ProductCount implements Serializable {
    private String productName;
    private Long productCount;

    public ProductCount(String productName, Long productCount) {
        this.productName = productName;
        this.productCount = productCount;
    }

    public String getProductName() {
        return productName;
    }

    public Long getProductCount() {
        return productCount;
    }
}
