package pt.amaralsoftware.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import pt.amaralsoftware.models.entity.CatConfigEntity;
import pt.amaralsoftware.repository.CatConfigRepository;

import java.util.List;

@ApplicationScoped
public class CatConfigService {

    @Inject
    CatConfigRepository catConfigRepository;

    public List<String> getGameVaultPlatform() {
        CatConfigEntity catConfigEntity = this.catConfigRepository.find("WHERE module = 'GameVault'").firstResult();
        String configuration = catConfigEntity.getConfiguration().toUpperCase();
        return List.of(configuration.split(","));
    }
}