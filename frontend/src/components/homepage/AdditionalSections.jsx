"use client";
import { motion } from 'framer-motion';
import { Users, Globe, Shield, Heart, TrendingUp, Clock, Award, BookOpen } from 'lucide-react';

export function MissionSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-gradient-to-br from-emerald-50 via-sky-50 to-purple-50"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="gaia-heading text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            To unite humanity in the face of global challenges through collective wisdom, 
            scientific collaboration, and sustainable action for our shared future.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="gaia-card p-8 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="gaia-heading text-xl font-semibold mb-4">Global Unity</h3>
            <p className="text-gray-600">Connecting people across borders, cultures, and generations to address shared challenges.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="gaia-card p-8 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="gaia-heading text-xl font-semibold mb-4">Planetary Protection</h3>
            <p className="text-gray-600">Safeguarding our environment and ensuring sustainable practices for future generations.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="gaia-card p-8 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="gaia-heading text-xl font-semibold mb-4">Compassionate Action</h3>
            <p className="text-gray-600">Promoting empathy, understanding, and collaborative solutions to global challenges.</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export function StatsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-white"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="gaia-heading text-4xl font-bold mb-4">Global Impact</h2>
          <p className="text-xl text-gray-600">Join thousands of planetarians making a difference</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-emerald-600 mb-2">50K+</div>
            <div className="text-gray-600">Active Members</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-sky-600 mb-2">150+</div>
            <div className="text-gray-600">Countries</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-purple-600 mb-2">1M+</div>
            <div className="text-gray-600">Actions Taken</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-rose-600 mb-2">24/7</div>
            <div className="text-gray-600">Global Activity</div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export function FeaturesSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-gradient-to-br from-sky-50 to-emerald-50"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="gaia-heading text-4xl font-bold mb-4">Platform Features</h2>
          <p className="text-xl text-gray-600">Everything you need to make a difference</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="gaia-card p-6 text-center"
          >
            <TrendingUp className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="gaia-heading text-lg font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-sm text-gray-600">Track global impact and progress in real-time</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="gaia-card p-6 text-center"
          >
            <Clock className="w-12 h-12 text-sky-600 mx-auto mb-4" />
            <h3 className="gaia-heading text-lg font-semibold mb-2">Doomsday Clock</h3>
            <p className="text-sm text-gray-600">Stay informed about critical global threats</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="gaia-card p-6 text-center"
          >
            <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="gaia-heading text-lg font-semibold mb-2">Achievement System</h3>
            <p className="text-sm text-gray-600">Earn recognition for your contributions</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="gaia-card p-6 text-center"
          >
            <BookOpen className="w-12 h-12 text-rose-600 mx-auto mb-4" />
            <h3 className="gaia-heading text-lg font-semibold mb-2">Knowledge Hub</h3>
            <p className="text-sm text-gray-600">Access curated resources and research</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
