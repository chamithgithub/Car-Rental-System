package lk.easyCar.config;

import lk.easyCar.util.PasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement//aspect (Manage all my transactions automatically using transaction manager)
@EnableJpaRepositories(basePackages = "lk.easyCar.repo")//link dao classes

public class JPAConfig {

    @Autowired
    Environment environment;

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource, JpaVendorAdapter adapter) {
        LocalContainerEntityManagerFactoryBean bean = new LocalContainerEntityManagerFactoryBean();
        bean.setJpaVendorAdapter(adapter);
        bean.setDataSource(dataSource);
        bean.setPackagesToScan(environment.getRequiredProperty("entity.package.name"));
        return bean;
    }

//    @Bean
//    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource ds, JpaVendorAdapter jpa){
//        LocalContainerEntityManagerFactoryBean bean= new LocalContainerEntityManagerFactoryBean();
//        bean.setPackagesToScan("lk.easyCar.entity");
//        bean.setDataSource(ds);
//        bean.setJpaVendorAdapter(jpa);
//        return bean;
//    }

    @Bean
    public DataSource dataSource(){
        //we use this data source only for testing purposes (Development)
        //if we are in (Production) we can use a DBCP pool
        DriverManagerDataSource ds = new DriverManagerDataSource();
        ds.setDriverClassName("com.mysql.jdbc.Driver");
        ds.setUrl("jdbc:mysql://localhost:3306/springCarDB?createDatabaseIfNotExist=true");
        ds.setUsername("root");
        ds.setPassword("root");
        return ds;
    }

    @Bean
    public JpaVendorAdapter jpaVendorAdapter() {
        HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
        adapter.setDatabasePlatform(environment.getRequiredProperty("my.app.dialect"));
        adapter.setDatabase(Database.MYSQL);
        adapter.setShowSql(true);
        adapter.setGenerateDdl(true);
        return adapter;
    }

//    @Bean
//    public JpaVendorAdapter jpaVendorAdapter(){
//        HibernateJpaVendorAdapter va=new HibernateJpaVendorAdapter();
//        va.setDatabasePlatform("org.hibernate.dialect.MySQL8Dialect");
//        va.setDatabase(Database.MYSQL);
//        va.setGenerateDdl(true);
//        va.setShowSql(true);
//        return va;
//    }


    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory emf){
        return new JpaTransactionManager(emf);
    }

    @Bean
    public PasswordEncryptor passwordEncryptor() {
        return new PasswordEncryptor();
    }
}