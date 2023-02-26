package lk.easyCar.repo;

import lk.easyCar.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdminRepo extends JpaRepository<Admin,String> {

    @Query(value = "SELECT * FROM admin WHERE admin_name=?1 AND password=?2",nativeQuery = true)
    Admin checkAdminLogIn(String name, String password);
}
