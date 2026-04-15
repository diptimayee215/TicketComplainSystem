import React from 'react'
import { Link } from "react-router-dom";

import {
  CheckCircle,
  ShieldCheck,
  Zap,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";
export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 mt-auto">
            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                            <Zap size={16} className="text-white" />
                        </div>
                        <h3 className="text-white text-xl font-bold">TicketSystem</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        A modern complaint and ticket management platform designed to streamline issue resolution for organizations.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                        <li><Link to="/about" className="hover:text-white transition">About</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                        <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Support</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
                        <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                                <Mail size={14} />
                            </div>
                            <span>support@ticketsystem.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                                <Phone size={14} />
                            </div>
                            <span>+91 9876543210</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                                <MapPin size={14} />
                            </div>
                            <span>Bhubaneswar, Odisha</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} Ticket Management System. All Rights Reserved.
            </div>
        </footer>
    )
}