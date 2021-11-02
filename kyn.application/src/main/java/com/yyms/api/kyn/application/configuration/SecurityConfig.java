package com.yyms.api.kyn.application.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.yyms.api.kyn.application.jwtsecurity.TokenAuthenticationFilter;
import com.yyms.api.kyn.application.oauth2security.AuthorizationFailureHandler;
import com.yyms.api.kyn.application.oauth2security.AuthorizationSuccessHandler;
import com.yyms.api.kyn.application.oauth2security.HttpCookieAuthorizationRequestRepo;
import com.yyms.api.kyn.application.service.OAuthUsersServiceImpl;
import com.yyms.api.kyn.application.service.UsersServiceImpl;


//Secure or Protect to unauthorized user to protect resource without valid JWT token
@Configuration
//use to enable configure class
@EnableWebSecurity
//use to enable Web Security
@EnableGlobalMethodSecurity(
		
		//security for controller, service method
        securedEnabled = true,
        
        //@RolesAllowed annotation
        jsr250Enabled = true,
        		
        //PreAuthorize or PostAuthorize
        prePostEnabled = true
        
)

public class SecurityConfig extends WebSecurityConfigurerAdapter{

	@Autowired
    private UsersServiceImpl usersServiceImpl;
    
    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter();
    }

    //AuthenticationManagerBuidler - is used to create AuthenticationManager
    //AuthenticationManagerBuilder - is used to build custom authentication, JDBC, etc
    //In my project, want to authenticate usersServiceImpl and passwordEncoder
    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(usersServiceImpl)
                .passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    //OAuth2 Login
    @Autowired
    private OAuthUsersServiceImpl oAuthUsersServiceImpl;
    
    @Autowired
    private AuthorizationSuccessHandler authorizationSuccessHandler;
    
    @Autowired
    private AuthorizationFailureHandler authorizationFailureHandler;
    
    @Bean
    public HttpCookieAuthorizationRequestRepo cookieAuthorizationRequestRepo() {
    	return new HttpCookieAuthorizationRequestRepo();
    }
    
    //configure cors, sessionManagement, add rules
    //permit or restrict
    //permit static like images, script and so on
    //permit register API, login API to everyone
    //restrict profile API, view API and search API
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                    .and()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()
                .csrf()
                    .disable()
                .formLogin()
                    .disable()
                .httpBasic()
                    .disable()                    
                .authorizeRequests()
                    .antMatchers("/",
                        "/error",
                        "/favicon.ico",
                        "/**/*.png",
                        "/**/*.gif",
                        "/**/*.svg",
                        "/**/*.jpg",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js")
                        .permitAll()
                    .antMatchers("/kyn/**", "/oauth2/**")
                        .permitAll()
                    .anyRequest()
                        .authenticated()
                    .and()
                .oauth2Login()
                    .authorizationEndpoint()
                        .baseUri("/oauth2/authorize")
                        .authorizationRequestRepository(cookieAuthorizationRequestRepo())
                        .and()
                    .redirectionEndpoint()
                        .baseUri("/oauth2/callback/*")
                        .and()
                    .userInfoEndpoint()
                        .userService(oAuthUsersServiceImpl)
                        .and()
                    .successHandler(authorizationSuccessHandler)
                    .failureHandler(authorizationFailureHandler);
                 

        // Add our custom Token based authentication filter
        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
