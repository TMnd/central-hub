package pt.amaralsoftware.api;

import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import org.apache.commons.collections4.CollectionUtils;
import org.jboss.resteasy.reactive.RestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.models.DTO.ShelveProductDTO;
import pt.amaralsoftware.service.ShelveProductService;
import pt.amaralsoftware.util.JSONSerializer;

import java.io.IOException;
import java.util.List;

@Path("/shelve/api")
public class ShelveProductAPI {
    private final Logger log = LoggerFactory.getLogger(ShelveProductAPI.class);

    @Inject
    ShelveProductService shelveProductService;

    @POST
    @Path("/product")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<ShelveProductDTO> createProduct(String payload) {
        try {
            ShelveProductDTO shelveProductDTO = JSONSerializer.fromJSON(payload, ShelveProductDTO.class);

            this.shelveProductService.saveProduct(shelveProductDTO);

            return RestResponse.ok(shelveProductDTO);
        } catch (IOException e) {
            log.error(e.getMessage());
        }

        return RestResponse.serverError();
    }

    @GET
    @Path("/products")
    @Produces(MediaType.APPLICATION_JSON)
    @Authenticated
    public RestResponse<List<ShelveProductDTO>> getProduct() {

        List<ShelveProductDTO> shelveProducts = this.shelveProductService.getShelveProducts();

        if(CollectionUtils.isEmpty(shelveProducts)) {
            return RestResponse.noContent();
        }

        return RestResponse.ok(shelveProducts);
    }

    @GET
    @Path("/product/{shelveCode}")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<ShelveProductDTO> getProductByShelveCode(@PathParam("shelveCode") String shelveCode) {
        ShelveProductDTO shelveProductDTOById = this.shelveProductService.getShelveProductDTOById(shelveCode);

        if(shelveProductDTOById == null) {
            return RestResponse.noContent();
        }

        return RestResponse.ok(shelveProductDTOById);
    }

    @PATCH
    @Path("/product/{shelveCode}")
    public RestResponse<ShelveProductDTO> updateProduct(@PathParam("shelveCode") String shelveCode, String payload) {
        try {
            ShelveProductDTO shelveProductDTO = JSONSerializer.fromJSON(payload, ShelveProductDTO.class);

            ShelveProductDTO updatedShelveProduct = this.shelveProductService.updateShelveProduct(shelveCode, shelveProductDTO);

            return RestResponse.ok(updatedShelveProduct);
        } catch (IOException e) {
            log.error(e.getMessage());
        }

        return RestResponse.serverError();
    }

    @DELETE
    @Path("/product/{shelveCode}")
    public RestResponse<String> deleteProduct(@PathParam("shelveCode") String shelveCode) {

        this.shelveProductService.removeShelveCode(shelveCode);

        return RestResponse.ok();
    }
}