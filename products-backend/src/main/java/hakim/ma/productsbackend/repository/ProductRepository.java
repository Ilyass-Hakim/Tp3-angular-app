package hakim.ma.productsbackend.repository;

import hakim.ma.productsbackend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
