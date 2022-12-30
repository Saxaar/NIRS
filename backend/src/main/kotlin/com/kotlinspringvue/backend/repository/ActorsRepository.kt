package com.kotlinspringvue.backend.repository

import com.kotlinspringvue.backend.jpa.Actor
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param
import java.util.*

interface ActorsRepository: JpaRepository<Actor,Long> {

    fun findByLastName(@Param("lastName") lastName : String) : Optional<Actor>

}