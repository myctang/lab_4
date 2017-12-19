package app.repositories;

import app.entities.Point;
import org.springframework.data.repository.CrudRepository;

public interface PointRepo extends CrudRepository<Point, Integer> {
}
