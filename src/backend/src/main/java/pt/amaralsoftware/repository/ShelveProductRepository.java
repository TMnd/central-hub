package pt.amaralsoftware.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import pt.amaralsoftware.models.ProductCount;
import pt.amaralsoftware.models.entity.CatShelveProductEntity;

import java.util.List;

@ApplicationScoped
public class ShelveProductRepository implements PanacheRepository<CatShelveProductEntity> {

    @Inject
    EntityManager em;

    public List<ProductCount> findGroupedProductSummaries() {

        String query = """
                SELECT MIN(product_name) AS product_name, COUNT(bar_code) AS product_count
                FROM cat_shelve_products
                GROUP BY product_name;
                """;

        return em.createNativeQuery(query, ProductCount.class).getResultList();
    }

}