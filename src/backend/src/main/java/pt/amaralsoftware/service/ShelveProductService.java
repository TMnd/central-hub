package pt.amaralsoftware.service;

import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import pt.amaralsoftware.models.DTO.ShelveProductDTO;
import pt.amaralsoftware.models.entity.CatShelveProductEntity;
import pt.amaralsoftware.repository.ShelveProductRepository;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ShelveProductService {

    private final String DATE_PATTERN = "yyyy-MM-dd";

    @Inject
    ShelveProductRepository shelveProductRepository;

    private static ShelveProductDTO getShelveProductDTO(CatShelveProductEntity shelvedProduct, String DATE_PATTERN, String formattedExpirationDate) {
        java.util.Date insertDate = shelvedProduct.getInsertDate();
        SimpleDateFormat sdf = new SimpleDateFormat(DATE_PATTERN);
        String insertDateFormatted = sdf.format(insertDate);

        return new ShelveProductDTO(
                shelvedProduct.getProductName(),
                shelvedProduct.getProductCode(),
                shelvedProduct.getBarCode(),
                shelvedProduct.getShelveCode(),
                formattedExpirationDate,
                insertDateFormatted,
                shelvedProduct.getDescription()
        );
    }

    @Transactional
    public void saveProduct(ShelveProductDTO shelveProductDTO) {

        Date date = Date.valueOf(shelveProductDTO.getDate());

        LocalDate expiryDateLocalData = LocalDate.parse(shelveProductDTO.getExpiryDate());
        ZonedDateTime expiryDate = ZonedDateTime.of(expiryDateLocalData, LocalTime.MIDNIGHT, ZoneId.of("Europe/Lisbon"));

        CatShelveProductEntity catShelveProductEntity = new CatShelveProductEntity(
            shelveProductDTO.getName(),
            shelveProductDTO.getProductId(),
            shelveProductDTO.getBarCode(),
            shelveProductDTO.getCode(),
            expiryDate,
            date,
            shelveProductDTO.getDescription()
        );

        this.shelveProductRepository.persist(catShelveProductEntity);
    }

    public ShelveProductDTO getShelveProductDTOById(String shelveCode) {
        CatShelveProductEntity catShelveProductEntity = this.shelveProductRepository.find("WHERE shelveCode = ?1", shelveCode).firstResult();

        if(catShelveProductEntity != null) {
            ZonedDateTime expirationDate = catShelveProductEntity.getExpirationDate();
            String formattedExpirationDate = expirationDate.format(DateTimeFormatter.ofPattern(DATE_PATTERN));

            return getShelveProductDTO(catShelveProductEntity, DATE_PATTERN, formattedExpirationDate);
        }
        return null;
    }

    public List<ShelveProductDTO> getShelveProducts() {

        List<CatShelveProductEntity> shelvedProducts = this.shelveProductRepository.findAll(Sort.by("expirationDate", Sort.Direction.Ascending)).list();

        List<ShelveProductDTO> products  = new ArrayList<>();

        for (CatShelveProductEntity shelvedProduct : shelvedProducts) {
            ZonedDateTime expirationDate = shelvedProduct.getExpirationDate();
            String formattedExpirationDate = expirationDate.format(DateTimeFormatter.ofPattern(DATE_PATTERN));

            ShelveProductDTO shelvedProductDTO = getShelveProductDTO(shelvedProduct, DATE_PATTERN, formattedExpirationDate);

            products.add(shelvedProductDTO);
        }

        return products;
    }

    @Transactional
    public ShelveProductDTO updateShelveProduct(String shelveCode, ShelveProductDTO updatedShelveProductDTO) {
        CatShelveProductEntity catShelveProductEntity = this.shelveProductRepository.find("WHERE shelveCode = ?1", shelveCode).firstResult();

        if(catShelveProductEntity != null && updatedShelveProductDTO != null) {
            if (updatedShelveProductDTO.getName() != null) {
                catShelveProductEntity.setProductName(updatedShelveProductDTO.getName());
            }

            if (updatedShelveProductDTO.getProductId() != null) {
                catShelveProductEntity.setProductCode(updatedShelveProductDTO.getProductId());
            }

            if (updatedShelveProductDTO.getCode() != null) {
                catShelveProductEntity.setShelveCode(updatedShelveProductDTO.getCode());
            }

            String expiryDateString = updatedShelveProductDTO.getExpiryDate();
            if (expiryDateString != null) {
                LocalDate expiryDateLocalData = LocalDate.parse(expiryDateString);
                ZonedDateTime expiryDate = ZonedDateTime.of(expiryDateLocalData, LocalTime.MIDNIGHT, ZoneId.of("Europe/Lisbon"));
                catShelveProductEntity.setExpirationDate(expiryDate);
            }

            String dateString = updatedShelveProductDTO.getDate();
            if (dateString != null) {
                Date date = Date.valueOf(dateString);
                catShelveProductEntity.setInsertDate(date);
            }

            ZonedDateTime expirationDate = catShelveProductEntity.getExpirationDate();
            String formattedExpirationDate = expirationDate.format(DateTimeFormatter.ofPattern(DATE_PATTERN));

            return getShelveProductDTO(catShelveProductEntity, DATE_PATTERN, formattedExpirationDate);
        }

        return null;
    }

    @Transactional
    public void removeShelveCode(String shelveCode) {
        this.shelveProductRepository.delete("WHERE shelveCode = ?1", shelveCode);
    }

    public List<ShelveProductDTO> getShelveProductsByCodeNearExpiration() {
        List<CatShelveProductEntity> shelvedProducts = this.shelveProductRepository.findAll().list();

        List<ShelveProductDTO> products  = new ArrayList<>();

        for (CatShelveProductEntity shelvedProduct : shelvedProducts) {
            ZonedDateTime currentDate = ZonedDateTime.now();
            ZonedDateTime expirationDate = shelvedProduct.getExpirationDate();

            if(currentDate.isAfter(expirationDate) || currentDate.isAfter(expirationDate.minusMonths(1))) {
                String formattedExpirationDate = expirationDate.format(DateTimeFormatter.ofPattern(DATE_PATTERN));
                ShelveProductDTO shelvedProductDTO = getShelveProductDTO(shelvedProduct, DATE_PATTERN, formattedExpirationDate);

                products.add(shelvedProductDTO);
            }
        }
        return products;
    }

}