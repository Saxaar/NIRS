package com.kotlinspringvue.backend.repository

import com.kotlinspringvue.backend.jpa.Perfomance
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param
import java.util.*
import javax.transaction.Transactional

interface PerfomanceRepository: JpaRepository<Perfomance,Long> {
    fun findByName(@Param("name") username: String): Optional<Perfomance>

    fun findByDate(@Param("date") username: String): Optional<Perfomance>

    @Transactional
    fun deleteById(@Param("id") username: String)
}