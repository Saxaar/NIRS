package com.kotlinspringvue.backend.controller

import javax.validation.Valid
import java.util.*
import java.util.stream.Collectors

import org.springframework.security.core.Authentication
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority

import com.kotlinspringvue.backend.model.LoginUser
import com.kotlinspringvue.backend.model.NewUser
import com.kotlinspringvue.backend.web.response.JwtResponse
import com.kotlinspringvue.backend.web.response.ResponseMessage
import com.kotlinspringvue.backend.jpa.User
import com.kotlinspringvue.backend.repository.UserRepository
import com.kotlinspringvue.backend.repository.RoleRepository
import com.kotlinspringvue.backend.jwt.JwtProvider
import com.kotlinspringvue.backend.service.ReCaptchaService
import org.springframework.web.bind.annotation.*

@CrossOrigin(origins = ["*"], maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
class AuthController() {

    @Autowired
    lateinit var authenticationManager: AuthenticationManager

    @Autowired
    lateinit var userRepository: UserRepository

    @Autowired
    lateinit var roleRepository: RoleRepository

    @Autowired
    lateinit var encoder: PasswordEncoder

    @Autowired
    lateinit var jwtProvider: JwtProvider


    @PostMapping("/signin")
    fun authenticateUser(@Valid @RequestBody loginRequest: LoginUser): ResponseEntity<*> {

        val userCandidate: Optional <User> = userRepository.findByUsername(loginRequest.username!!)

        if (userCandidate.isPresent) {
            val user: User = userCandidate.get()
            val authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(loginRequest.username, loginRequest.password))
            SecurityContextHolder.getContext().setAuthentication(authentication)
            val jwt: String = jwtProvider.generateJwtToken(user.username!!)
            val authorities: List<GrantedAuthority> = user.roles!!.stream().map({ role -> SimpleGrantedAuthority(role.name)}).collect(Collectors.toList<GrantedAuthority>())
            return ResponseEntity.ok(JwtResponse(jwt, user.username, authorities))
        } else {
            return ResponseEntity(ResponseMessage("User not found!"),
                HttpStatus.BAD_REQUEST)
        }
    }

    @PostMapping("/signup")
    fun registerUser(@Valid @RequestBody newUser: NewUser): ResponseEntity<*> {

        val userCandidate: Optional <User> = userRepository.findByUsername(newUser.username!!)

        if (!userCandidate.isPresent) {
            if (usernameExists(newUser.username!!)) {
                return ResponseEntity(ResponseMessage("Username is already taken!"),
                    HttpStatus.BAD_REQUEST)
            } else if (emailExists(newUser.email!!)) {
                return ResponseEntity(ResponseMessage("Email is already in use!"),
                    HttpStatus.BAD_REQUEST)
            }

            // Creating user's account
            val user = User(
                0,
                newUser.username!!,
                newUser.firstName!!,
                newUser.lastName!!,
                newUser.email!!,
                encoder.encode(newUser.password),
                true
            )
            user!!.roles = Arrays.asList(roleRepository.findByName("ROLE_USER"))

            userRepository.save(user)

            return ResponseEntity(ResponseMessage("User registered successfully!"), HttpStatus.OK)
        } else {
            return ResponseEntity(ResponseMessage("User already exists!"),
                HttpStatus.BAD_REQUEST)
        }
    }

    @DeleteMapping("/delete/{id}")
    fun deleteById(@PathVariable(value = "id") id: Long): ResponseEntity<Void> {
        return userRepository.findById(id).map {
            userRepository.delete(it)
            ResponseEntity<Void>(HttpStatus.OK)
        }.orElse(ResponseEntity.notFound().build())
    }

    private fun emailExists(email: String): Boolean {
        return userRepository.findByUsername(email).isPresent
    }

    private fun usernameExists(username: String): Boolean {
        return userRepository.findByUsername(username).isPresent
    }

}