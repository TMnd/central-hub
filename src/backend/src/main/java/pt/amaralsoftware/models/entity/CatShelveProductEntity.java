
package pt.amaralsoftware.models.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Date;

@Entity
@Table(name = "cat_shelve_products")
public class CatShelveProductEntity extends PanacheEntityBase implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    private String productName;
    private String barCode;
    private String productCode;
    private String shelveCode;
    private ZonedDateTime expirationDate;
    private Date insertDate;
    private String description;

    public CatShelveProductEntity() {
    }

    public CatShelveProductEntity(
            String productName,
            String productCode,
            String barCode,
            String shelveCode,
            ZonedDateTime expirationDate,
            Date insertDate,
            String description
    ) {
        this.productName = productName;
        this.barCode = barCode;
        this.productCode = productCode;
        this.shelveCode = shelveCode;
        this.expirationDate = expirationDate;
        this.insertDate = insertDate;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getBarCode() {
        return barCode;
    }

    public void setBarCode(String barCode) {
        this.barCode = barCode;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getShelveCode() {
        return shelveCode;
    }

    public void setShelveCode(String shelveCode) {
        this.shelveCode = shelveCode;
    }

    public ZonedDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(ZonedDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Date getInsertDate() {
        return insertDate;
    }

    public void setInsertDate(Date insertDate) {
        this.insertDate = insertDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
