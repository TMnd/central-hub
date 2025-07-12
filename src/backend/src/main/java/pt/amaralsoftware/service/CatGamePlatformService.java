package pt.amaralsoftware.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import pt.amaralsoftware.models.entity.CatGamePlatformEntity;
import pt.amaralsoftware.repository.CatGamePlatformRepository;
import pt.amaralsoftware.util.MapSerializer;

import java.util.Map;

@ApplicationScoped
public class CatGamePlatformService {

    @Inject
    CatGamePlatformRepository catGamePlatformRepository;

    @Transactional
    public void savePlatforms(Map<String, Object> platform) {
        if(!platform.isEmpty()) {
            CatGamePlatformEntity catGamePlatformEntity = MapSerializer.fromMapToObj(platform, CatGamePlatformEntity.class);

            if (catGamePlatformRepository.find("Where name = ?1", catGamePlatformEntity.getName()).firstResult() == null) {
                catGamePlatformRepository.persist(catGamePlatformEntity);
            }

        }
    }
}