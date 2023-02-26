package lk.easyCar.config;


import lk.easyCar.entity.Admin;
import lk.easyCar.repo.AdminRepo;
import lk.easyCar.util.PasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;

@Configuration
@Import(JPAConfig.class)
public class WebRootConfig {

    @Autowired
    AdminRepo adminRepo;

    @Autowired
    Environment env;

    @Autowired
    PasswordEncryptor passwordEncryptor;

    //create admin account when server start
    @Bean
    public void createAdminAccount() {
        Admin admin = new Admin();

        String password = passwordEncryptor.doHashing(env.getProperty("admin.password"));

        admin.setAdmin_id(env.getProperty("admin.id"));
        admin.setPassword(password);
        admin.setName(env.getProperty("admin.username"));
        adminRepo.save(admin);
    }

}
