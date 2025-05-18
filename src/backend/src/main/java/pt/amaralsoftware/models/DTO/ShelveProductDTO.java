package pt.amaralsoftware.models.DTO;

public class ShelveProductDTO {
    private String name;
    private String barCode;
    private String productId;
    private String code;
    private String expiryDate;
    private String date;
    private String description;

    public ShelveProductDTO() {
    }

    public ShelveProductDTO(
            String name,
            String productId,
            String barCode,
            String code,
            String expiryDate,
            String date,
            String description
    ) {
        this.name = name;
        this.barCode = barCode;
        this.productId = productId;
        this.code = code;
        this.expiryDate = expiryDate;
        this.date = date;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBarCode() {
        return barCode;
    }

    public void setBarCode(String barCode) {
        this.barCode = barCode;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}