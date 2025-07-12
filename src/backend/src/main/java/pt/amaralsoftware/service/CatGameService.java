package pt.amaralsoftware.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import pt.amaralsoftware.models.entity.CatGameEntity;
import pt.amaralsoftware.repository.CatGameRepository;
import pt.amaralsoftware.util.MapSerializer;

import java.util.Map;

@ApplicationScoped
public class CatGameService {

    @Inject
    CatGameRepository catGameRepository;

    @Transactional
    public void saveGames(Map<String, Object> game) {
        if(!game.isEmpty()) {
            CatGameEntity catGameEntity = MapSerializer.fromMapToObj(game, CatGameEntity.class);

            if (catGameRepository.find("Where name = ?1", catGameEntity.getName()).firstResult() == null) {
                catGameRepository.persist(catGameEntity);
            }
        }
    }
}