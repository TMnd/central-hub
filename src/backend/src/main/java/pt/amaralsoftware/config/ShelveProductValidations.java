package pt.amaralsoftware.config;

import io.quarkus.scheduler.Scheduled;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.apache.commons.collections4.CollectionUtils;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.client.NtfyClient;
import pt.amaralsoftware.models.DTO.ShelveProductDTO;
import pt.amaralsoftware.service.ShelveProductService;

import java.util.Base64;
import java.util.List;

@ApplicationScoped
public class ShelveProductValidations {

    private static final Logger log = LoggerFactory.getLogger(ShelveProductValidations.class);

    @ConfigProperty(name = "ntfy.topic")
    String nrfyTopic;

    @ConfigProperty(name = "ntfy.user")
    String ntfyUser;

    @ConfigProperty(name = "ntfy.password")
    String ntfyPassword;

    @RestClient
    NtfyClient ntfyClient;

    @Inject
    ShelveProductService shelveProductService;

    @Scheduled(cron = "0 0 12 ? * 1")
    void checkExpirationDate() {
        log.info("Verifying expired products and near expiration date.");

        StringBuilder sb = new StringBuilder();

        List<ShelveProductDTO> shelveProductsByCodeNearExpirationOrExpired = this.shelveProductService.getShelveProductsByCodeNearExpiration();

        if(CollectionUtils.isNotEmpty(shelveProductsByCodeNearExpirationOrExpired)) {
            sb.append("ATTENTION\n The following products may be expired or nearing expiration.\n");

            for(ShelveProductDTO product: shelveProductsByCodeNearExpirationOrExpired) {
                String shelveProduct = String.format("%s - %s", product.getName());
                sb.append(shelveProduct).append("\n");
            }

            String authHeader = basicToken();

            this.ntfyClient.send(nrfyTopic, authHeader, sb.toString());
        }

        log.info("All the products seems to be ok.");
    }

    private String basicToken() {
        String credentials = ntfyUser + ":" + ntfyPassword;
        String encodedAuth = Base64.getEncoder().encodeToString(credentials.getBytes());
        return "Basic " + encodedAuth;
    }

    @Scheduled(cron = "0 0 12 L * ?")
    void generateReport() {
        log.info("Generating report and sending file.");

        StringBuilder sb = new StringBuilder();

        sb.append("Name,ProductId,Code,ExpiryDate,InsertDate\n");

        List<ShelveProductDTO> shelveProducts = this.shelveProductService.getShelveProducts();

        for (ShelveProductDTO shelveProductDTO : shelveProducts) {
            String product = String.format(
                    "%s,%s,%s,%s,%s",
                    shelveProductDTO.getName(),
                    shelveProductDTO.getShelveCode(),
                    shelveProductDTO.getExpiryDate(),
                    shelveProductDTO.getDate()
            );
            sb.append(product).append("\n");
        }

        String authHeader = basicToken();

        this.ntfyClient.send(nrfyTopic, authHeader, sb.toString());
    }
}
